import urllib.request

file_id = '1-91aVYpyp8hjS2qk02d517uKf1yXq6ZD'
download_url = f'https://drive.google.com/uc?id={file_id}&export=download'
req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
print('Downloading video to public/objectflow.mp4...')
with urllib.request.urlopen(req) as resp, open('public/objectflow.mp4', 'wb') as f:
    f.write(resp.read())
print('Downloaded successfully!')
