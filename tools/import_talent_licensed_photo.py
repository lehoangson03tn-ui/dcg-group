"""Download a non-AI, standard free Unsplash photograph for DCG TALENT.

Photographer: Raka Rahmadani
URL: https://unsplash.com/photos/students-working-on-laptops-at-a-shared-desk-rh4xapY-haI
Source: https://images.unsplash.com/photo-1756273343749-63f7d6ea0cda
License: https://unsplash.com/license (attribution optional, commercial use allowed)
Not a DCG employee photograph. Preserve original bytes, generate faithful WebP sizes.
"""
from io import BytesIO
from pathlib import Path
from urllib.request import urlopen, Request
from PIL import Image, ImageOps
import hashlib
out=Path("public/assets/editorial")
out.mkdir(parents=True,exist_ok=True)
url="https://images.unsplash.com/photo-1756273343749-63f7d6ea0cda?fm=jpg&fit=max&w=2200&q=86"
req=Request(url,headers={"User-Agent":"DCG-Image-Provenance/1.0"})
with urlopen(req, timeout=40) as response:
    data=response.read(13000000)
    assert response.status==200 and "image/" in response.headers.get("content-type","")
assert 50000<len(data)<10000000,len(data)
original=out/"talent-student-collaboration-licensed-source.jpg"
original.write_bytes(data)
with Image.open(BytesIO(data)) as raw:
    image=ImageOps.exif_transpose(raw).convert("RGB")
assert image.width>=1100 and image.height>=640,image.size
print("ORIGINAL",image.size,len(data),hashlib.sha256(data).hexdigest())
for w in (960,1600):
    im=image.copy()
    if im.width>w:im.thumbnail((w,w*4),Image.Resampling.LANCZOS)
    target=out/("talent-student-collaboration-"+str(w)+".webp")
    im.save(target,"WEBP",quality=84,method=6)
    assert target.stat().st_size>=25000,target.stat().st_size
    print("WEBP",str(target),im.size,target.stat().st_size)
