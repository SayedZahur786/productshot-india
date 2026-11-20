from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import subprocess
captions=[(6,'Your product. A clearer first impression.'),(5,'Background removal runs on your device.'),(5,'Choose a photo and a marketplace size.'),(12,'Remove the clutter. Keep the product.'),(8,'Drag to compare. Always inspect the edges.'),(4,'Download your finished JPG.'),(10,'Two fixed lifestyle scenes. No custom generation.'),(7,'2 images free. Paid packs await merchant setup.')]
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',38)
lines=[]
for i,(duration,caption) in enumerate(captions):
 image=Image.new('RGB',(1440,140),'#173e2c');draw=ImageDraw.Draw(image);draw.text((720,70),caption,font=font,fill='white',anchor='mm');image.save(f'.local/caption-{i}.png');lines += [f"file 'caption-{i}.png'",f'duration {duration}']
lines += ["file 'caption-7.png'"]
Path('.local/captions.concat').write_text('\n'.join(lines))
subprocess.run(['ffmpeg','-y','-i','.local/demo.webm','-f','concat','-safe','0','-i','.local/captions.concat','-i','.local/narration.aiff','-filter_complex','[0:v]pad=1440:1140:0:0:color=0x173e2c[base];[base][1:v]overlay=0:1000:shortest=0[v];[2:a]apad[a]','-map','[v]','-map','[a]','-t','57','-c:v','libx264','-crf','24','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-movflags','+faststart','docs/demo.mp4'],check=True)
