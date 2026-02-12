from PIL import Image
import shutil
import os

# Paths
# User provided image
source_image = r"C:/Users/Mzzal/.gemini/antigravity/brain/9928ae16-1a26-46c4-88b2-6ce44f09a614/uploaded_media_1769764317994.png"
target_dir = r"d:\antigravity\crm\public"
target_png = os.path.join(target_dir, "icon.png")
target_ico = os.path.join(target_dir, "icon.ico")

print(f"Update Process Started...")
print(f"Source: {source_image}")

try:
    # 1. Copy/Overwrite PNG
    print(f"Copying to {target_png}...")
    shutil.copy2(source_image, target_png)
    
    # 2. Convert to ICO
    print(f"Converting to {target_ico}...")
    img = Image.open(target_png)
    
    # Ensure it's RGBA
    img = img.convert("RGBA")
    
    icon_sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    img.save(target_ico, sizes=icon_sizes)
    
    print("SUCCESS: Icons updated with User Image.")

except Exception as e:
    print(f"ERROR: {e}")
