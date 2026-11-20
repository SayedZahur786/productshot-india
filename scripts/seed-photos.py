from pathlib import Path
from rembg import remove, new_session
from PIL import Image
session=new_session('u2netp')
for name in ['bottle','mug','bag','shoe','jar']:
    source=Path('.local/source')/f'{name}.jpg'
    im=Image.open(source).convert('RGB'); im.thumbnail((1000,1000))
    canvas=Image.new('RGB',(1000,1000),'#e4e5df'); canvas.paste(im,((1000-im.width)//2,(1000-im.height)//2))
    canvas.save(f'public/samples/{name}-before.jpg',quality=88)
    cutout=remove(im,session=session)
    cutout.save(f'.local/source/{name}-cutout.png')
    print(name,flush=True)
