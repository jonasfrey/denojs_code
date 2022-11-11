#ffmpeg -y -i ./HD_Touhou_Bad_Apple.mp4 -vf "select=eq(n\,88)" -vframes 1 HD_Touhou_Bad_Apple_88.png
#or
ffmpeg -i HD_Touhou_Bad_Apple.mp4 -vf fps=30 ./bad_apple/HD_Touhou_Bad_Apple_%d.png