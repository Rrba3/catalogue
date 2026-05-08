#!/usr/bin/env python3
"""Remove backgrounds from all images in the public folder."""

import sys
import subprocess
from pathlib import Path

def install_deps():
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg[cpu]", "Pillow", "-q"])

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("Installing dependencies...")
    install_deps()
    from rembg import remove
    from PIL import Image

PUBLIC_DIR = Path("/Users/houssemabdelkefi/Documents/GitHub/LVMH/catalogue/public")
EXTENSIONS = {".webp", ".png", ".jpg", ".jpeg"}

def process_image(path: Path):
    with open(path, "rb") as f:
        input_data = f.read()

    output_data = remove(input_data)

    # Save back as WebP with transparency, replacing the original
    from io import BytesIO
    img = Image.open(BytesIO(output_data)).convert("RGBA")
    out_path = path.with_suffix(".webp")
    img.save(out_path, "WEBP", quality=90)

    # Remove original if extension changed
    if path != out_path:
        path.unlink()

    return out_path

def main():
    images = [
        p for p in PUBLIC_DIR.rglob("*")
        if p.suffix.lower() in EXTENSIONS and p.is_file()
        and "OLD" not in p.parts  # skip OLD folder
    ]

    print(f"Found {len(images)} images to process\n")

    for i, img_path in enumerate(images, 1):
        print(f"[{i}/{len(images)}] {img_path.relative_to(PUBLIC_DIR)} ... ", end="", flush=True)
        try:
            process_image(img_path)
            print("done")
        except Exception as e:
            print(f"FAILED: {e}")

    print("\nAll done!")

if __name__ == "__main__":
    main()
