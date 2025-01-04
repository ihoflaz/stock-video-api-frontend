# Stock Video API Frontend

Bu proje, çeşitli stok video sitelerinden (Pixabay, Pexels vb.) videoları tek bir arayüzde aramak ve görüntülemek için geliştirilmiş bir React uygulamasıdır.

## 🚀 Özellikler

- Tek arayüzde birden fazla stok video sitesinde arama
- Pixabay ve Pexels API entegrasyonu
- Responsive tasarım
- Video önizleme ve detay görüntüleme
- Sayfalama desteği
- Redux state yönetimi
- API durum kontrolü

## 🛠️ Teknolojiler

- React 18
- Redux Toolkit
- Axios
- CSS3 (Grid ve Flexbox)
- Create React App
- Vercel Deployment

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/stock-video-api.git
cd stock-video-api/frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```bash
REACT_APP_API_URL=http://localhost:3001
```

4. Geliştirme sunucusunu başlatın:
```bash
npm start
```

## 📁 Proje Yapısı

```
frontend/
├── public/
├── src/
│   ├── components/         # React bileşenleri
│   │   ├── ApiStatus.js   # API durum kontrolü
│   │   ├── SearchBar.js   # Arama çubuğu
│   │   ├── VideoList.js   # Video listesi
│   │   └── VideoColumns.js # Video kolonları
│   ├── store/             # Redux store
│   │   ├── index.js       # Store yapılandırması
│   │   ├── pixabaySlice.js # Pixabay state yönetimi
│   │   └── pexelsSlice.js # Pexels state yönetimi
│   ├── styles/            # CSS dosyaları
│   └── App.js             # Ana uygulama bileşeni
└── package.json
```

## 🚀 Deployment

Proje Vercel'e deploy edilmiştir. Production ortamı için:

1. `.env.production` dosyasını oluşturun:
```bash
REACT_APP_API_URL=https://stock-video-api-backend.vercel.app
```

2. Build alın:
```bash
npm run build
```

3. Vercel'e deploy edin:
```bash
vercel
```

## 🔗 API Entegrasyonu

- Pixabay API: Video arama ve listeleme
- Pexels API: Video arama ve listeleme
- Backend API: `/api/health` endpoint'i ile API durumu kontrolü

## 📝 Notlar

- API anahtarları backend'de saklanmaktadır
- Development ortamında backend'in localhost:3001'de çalışıyor olması gerekir
- Production ortamında Vercel üzerinden servis edilmektedir
