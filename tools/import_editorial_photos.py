"""Download only the four editorial photos individually verified as free Unsplash images.

No AI generated assets; no compositing and no artificial color grading.
Keep original downloaded JPG, and create quality-focused WebP sizes from it.
"""
from __future__ import annotations
from io import BytesIO
from pathlib import Path
import hashlib
from PIL import Image, ImageOps
from urllib.request import Request, urlopen

OUT = Path("public/assets/editorial")
OUT.mkdir(parents=True,exist_ok=True)
PHOTOS = [
 ("hcm-city", "1602479185069-cf2cfc4c463f", "In5ENUxUrO8"),
 ("studio-crew", "1759187766895-86c46a068315", "skQLP2oB09k"),
 ("food-kitchen", "1771574207826-02f0d845e3a7", "YFK5dBI6Ftc"),
 ("vietnam-live-stage", "1586420085482-0b68a7a227d8", "2L6FJbsWtCg"),
]
for slug, asset_id, photo_id in PHOTOS:
    url = f"https://images.unsplash.com/photo-{asset_id}?fm=jpg&fit=max&w=2000&q=86"
    request=Request(url,headers={"User-Agent":"DCG-Asset-Manifest/1.0"})
    with urlopen(request,timeout=40) as response:
        data=response.read(14_000_000)
        content_type=response.headers.get("Content-Type","")
        assert response.status==200, (slug,response.status)
        assert "image/" in content_type, (slug,content_type)
    assert 40_000 <= len(data) <= 10_000_000, (slug,len(data))
    with Image.open(BytesIO(data)) as inp:
        inp.load()
        img=ImageOps.exif_transpose(inp).convert("RGB")
    assert img.width>=800 and img.height>=500, (slug,img.size)
    src=OUT/(slug+"-licensed-source.jpg")
    src.write_bytes(data)
    print("SOURCE",slug,len(data),img.size,"sha256",hashlib.sha256(data).hexdigest(),url)
    for size in (960,1600):
        out=img.copy()
        if out.width>size:
            out.thumbnail((size, size*4),Image.Resampling.LANCZOS)
        target=OUT/(slug+"-"+str(size)+".webp")
        out.save(target,"WEBP",quality=83,method=6,exact=True)
        assert target.stat().st_size>25_000,(target,target.stat().st_size)
        print("DERIVED",target,out.size,target.stat().st_size,hashlib.sha256(target.read_bytes()).hexdigest())
