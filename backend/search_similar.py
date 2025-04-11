import os
import json
import argparse
from PIL import Image
import numpy as np
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet18
import faiss

# Load pretrained ResNet18 model
model = resnet18(pretrained=True)
model.fc = torch.nn.Identity()  # Remove final classification layer
model.eval()

# Define image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

# Extract features from a single image
def extract_features(image_path):
    try:
        img = Image.open(image_path).convert('RGB')
        img_tensor = transform(img).unsqueeze(0)
        with torch.no_grad():
            features = model(img_tensor).squeeze().numpy()
        return features / np.linalg.norm(features)
    except Exception as e:
        print(json.dumps({"error": f"Error processing image {image_path}: {str(e)}"}))
        exit(1)

# Parse input image path from command line
parser = argparse.ArgumentParser(description='Visual Search for Jewellery')
parser.add_argument('image_path', type=str, help='Path to the uploaded image')
args = parser.parse_args()

upload_path = args.image_path

if not os.path.exists(upload_path):
    print(json.dumps({"error": "Uploaded image does not exist."}))
    exit(1)

# Prepare dataset
dataset_dir = os.path.join(os.getcwd(), 'jewellery_dataset')
if not os.path.exists(dataset_dir):
    print(json.dumps({"error": "jewellery_dataset folder not found."}))
    exit(1)

image_paths = [
    os.path.join(dataset_dir, f)
    for f in os.listdir(dataset_dir)
    if f.lower().endswith(('.jpg', '.jpeg', '.png'))
]

features = []
filenames = []

# Extract features from dataset
for path in image_paths:
    try:
        feat = extract_features(path)
        features.append(feat)
        filenames.append(os.path.basename(path))
    except:
        continue

# Create FAISS index
features_np = np.array(features).astype('float32')
index = faiss.IndexFlatL2(features_np.shape[1])
index.add(features_np)

# Extract features for uploaded image and search
query_feat = extract_features(upload_path).astype('float32')
D, I = index.search(np.array([query_feat]), k=5)

# Collect matched image filenames
matches = [filenames[i] for i in I[0]]
print(json.dumps({"matches": matches}))
