"""Derive a transparent-background DCG Entertainment emblem without repainting art.

Only edge-connected nearly neutral/light background pixels have alpha removed.
The input WebP and every remaining RGB channel are kept unchanged.
"""
from collections import deque
from pathlib import Path
from PIL import Image

src=Path("public/assets/dcg-entertainment-emblem-safe.webp")
dst=Path("public/assets/dcg-entertainment-emblem-transparent-preserved.png")
photo=Image.open(src).convert("RGBA")
w,h=photo.size
assert w>=900 and h>=800, f"Unapproved low-resolution source: {w}x{h}"
px=photo.load()
mask=bytearray(w*h)
q=deque()

def backdrop(x,y):
    r,g,b,_=px[x,y]
    return min(r,g,b)>=228 and max(r,g,b)-min(r,g,b)<=17

for x in range(w):
    for y in (0,h-1):
        i=y*w+x
        if not mask[i] and backdrop(x,y):
            mask[i]=1
            q.append((x,y))
for y in range(h):
    for x in (0,w-1):
        i=y*w+x
        if not mask[i] and backdrop(x,y):
            mask[i]=1
            q.append((x,y))

while q:
    x,y=q.popleft()
    for xx,yy in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
        if 0<=xx<w and 0<=yy<h:
            i=yy*w+xx
            if not mask[i] and backdrop(xx,yy):
                mask[i]=1
                q.append((xx,yy))

changed=mask.count(1)
assert changed > int(w*h*.12), f"White background removal unexpectedly low: {changed}"
assert changed < int(w*h*.82), f"Logo preservation unsafe: {changed}"
out=Image.new("RGBA",(w,h))
op=out.load()
foreground=0
for y in range(h):
    for x in range(w):
        r,g,b,a=px[x,y]
        if mask[y*w+x]:
            op[x,y]=(r,g,b,0)
        else:
            op[x,y]=(r,g,b,255)
            foreground+=1
assert foreground>=int(w*h*.18)
assert op[w//2,h//2][3] in (0,255)
out.save(dst, optimize=True)
with Image.open(dst) as chk:
    assert chk.size==(w,h) and chk.mode=="RGBA"
    assert chk.getpixel((0,0))[3]==0
print(f"DERIVED: {src} -> {dst}")
print(f"DIMENSIONS: {w}x{h}, alpha cleared: {changed}, foreground preserved: {foreground}")
print("PIXEL INTEGRITY: every RGB value copied unchanged; original WebP untouched")
