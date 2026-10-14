import urllib.request
import sys

file_id = '1-91aVYpyp8hjS2qk02d517uKf1yXq6ZD'
download_url = f'https://drive.google.com/uc?id={file_id}&export=download'
req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=30) as resp, open('public/objectflow.mp4', 'wb') as f:
        total = int(resp.headers.get('Content-Length', 0))
        downloaded = 0
        chunk_size = 64 * 1024
        while True:
            chunk = resp.read(chunk_size)
            if not chunk:
                break
            f.write(chunk)
            downloaded += len(chunk)
            if total > 0 and downloaded % (512 * 1024) < chunk_size:
                print(f'{downloaded / 1024 / 1024:.1f} MB / {total / 1024 / 1024:.1f} MB')
    print('COMPLETE! Total:', downloaded)
except Exception as e:
    print('Error:', e)
