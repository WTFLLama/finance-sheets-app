# Kart Pusulası

Bonus Genç, DenizKart Black, QNB ve Rail&Miles kartlarının aktif kampanyalarını izleyen, bir harcamada en avantajlı kartı gösteren kişisel web uygulaması.

**Adres:** https://wtfllama.github.io/finance-sheets-app/kart-pusulasi/

## Ana ekrana ekleme
- **iPhone (Safari):** Paylaş → *Ana Ekrana Ekle*
- **Android (Chrome):** ⋮ menü → *Ana ekrana ekle* / *Uygulamayı yükle*

## Nasıl çalışır
- `index.html`: uygulamanın tamamı (tek dosya).
- `katalog.json`: kampanya kataloğu. İki günde bir otomatik taramayla güncellenir; uygulama her açılışta en güncelini çeker.
- `sw.js`: çevrimdışı önbellek (internet yokken son kopyayla açılır).
- Katılım durumu, ilerleme ve ayarlar yalnızca cihazın kendi hafızasında saklanır; repoya hiçbir kişisel veri yazılmaz.
- Uygulama kart numarası, şifre veya banka bilgisi istemez ve saklamaz.

DenizKart Black altındaki Maximum kampanyaları, kart Maximum Platinum'a geçmiş gibi kabul edilerek gösterilir (geçiş tarihi: 6 Aralık 2026).
