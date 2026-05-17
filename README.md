# plant-watering-tracker

## Proje Açıklaması
Plant Tracker, kullanıcıların bitkilerini takip edebilmesi için geliştirilmiş bir ReactJS uygulamasıdır. Kullanıcılar:
- Bitki ekleyebilir
- Bitki silebilir
- Bitki bilgilerini güncelleyebilir
- Bitkilerin son sulanma tarihini kaydedebilir
- Bir sonraki sulama tarihini görüntüleyebilir
- Sulama için kalan gün bilgisini takip edebilir
- Sulama işlemini geri alabilir (Undo sistemi)
- Bitkileri filtreleyebilir
- Dashboard üzerinden genel durumu görüntüleyebilir

---

## Uygulamanın Özellikleri
- CRUD işlemleri (Create, Read, Update, Delete)
- Bitki sulama takibi
- Sonraki sulama tarihi hesaplama
- Kalan gün hesaplama sistemi
- Progress bar sistemi
- Dashboard sistemi
- Filtreleme sistemi
- Undo (geri alma) sistemi
- Responsive UI tasarımı
- Bootstrap 5 destekli modern arayüz

---

## Veri Saklama Yapısı
Veriler tarayıcının LocalStorage sistemi üzerinde saklanır. Bu nedenle:
- Kaydedilen veriler yalnızca uygulamanın çalıştığı cihazda görünür.
- Başka bir cihazdan erişilemez.
- Tarayıcı verileri temizlenirse kayıtlı bilgiler silinebilir.

---

## Kullanılan Teknolojiler
- ReactJS
- Vite
- Bootstrap 5
- LocalStorage

---

## Kullanılan Teknolojilerin sürümleri

```bash
"bootstrap": "^5.3.8",
"react": "^19.2.5",
"react-dom": "^19.2.5",
"vite": "^8.0.10"
```

---
## Çalıştırma Adımları

### 1. Projeyi oluştur
```bash
npm create vite@latest plant-tracker
```

### 2. Proje klasörüne gir
```bash
cd plant-tracker
```

### 3. Bağımlılıkları yükle
```bash
npm install
```

### 4. Bootstrap kurulumu
```bash
npm install bootstrap
```

### 5. Geliştirme sunucusunu çalıştır
```bash
npm run dev
```

### 6. Tarayıcıdan aç
- Vite terminal üzerinde bir localhost adresi verecektir.
- Örnek:
```bash
http://localhost:5173
```
- Terminal üzerinden verilen adres ile uygulamaya erişebilirsiniz.
