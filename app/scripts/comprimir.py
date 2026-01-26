from PIL import Image,ImageOps
import os

input_folder = r"C:\Users\laura\Desktop\Catalogo\app\static\img"
output_folder = r"C:\Users\laura\Desktop\Catalogo\app\static\img_comprimidas\totes"

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        img_path = os.path.join(input_folder, filename)
        
        with Image.open(img_path) as img:
            img = ImageOps.exif_transpose(img)
            ##img = img.rotate(-90, expand=True)
            img.thumbnail((800, 800))

            new_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(output_folder, new_filename)

            img.save(output_path, "WEBP", quality=70)

print("✅ Imágenes convertidas y comprimidas.")
