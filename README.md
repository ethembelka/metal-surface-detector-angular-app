# Metal Kusur Tespiti Projesinin Angular front-end Kısmı
## Prrojenin İşlevselliği
Bu proje metal kusur tespiti projesinin arayüz kısmını oluşturmaktadır ve spring ve python tarafı ile iletişim kurmaktadır. 
1. Home Page kısmında taramayı başlat butonu ile python projesindeki kameranın ve modelin çalışması sağlanır. Bu butona tıklandığında kamera başlatılır ve bir test resmi modele verilerek modelin çıktısı veritabanına kaydedilip web socket aracılığı ile ekranda gösterilmektedir. Tarama başlatıldıktan sonra Fotoğraf çek butonu aktif olur ve bu butona tıkladıktan sonra çekilen fotoğraf modele verilip sonuç ekranda gösterilir.
2. View Camera sayfası açıldığında kamerayı aç ve kamerayı kapat butonları bulunmaktadır. Kamerayı aç butonuna tıklanınca python tarafında çalışan kamera 5000 portu üzerinden http ile yayın yapmaya başlar ve bu yayın ekranda gösterilir. Kamera görüntüsünün akıcı olmaması halinde udp ile gönderim sağlanılması düşünülmektedir. Kamerayı kapat butonuna tıklanınca python tarafındaki yayın durdurulur ve kamera görüntüsü ekrandan kaybolur.
3. Report Page açıldığında metal levhaya ait alanlara göre filtreleme işlemi yapılmaktadır. Tarihe, kusur tipine, isme, doğruluk oranına göre filtrelemeler yapılmaktadır. Filtrelenen sonuçlar ekranda gösterilir.

## Tarama Başlatılmamış Anasayfa
![image](https://github.com/user-attachments/assets/2b566f35-83e7-4247-8f6d-50b604d873ab)
## Tarama Başlatılmış Anasayfa
![image](https://github.com/user-attachments/assets/c5bea992-af65-4f2d-a0db-2a9d4158fdc3)
## Kamerayı Görüntüle Sayfası
![image](https://github.com/user-attachments/assets/077ca62e-beaf-4a3c-a2ff-d803675090d8)
## Rapor Sayfası
![image](https://github.com/user-attachments/assets/3f724b57-d6c7-47a8-a5df-39da9054b7a3)
## Rapor Sayfası Detay
![image](https://github.com/user-attachments/assets/c8f2b85b-12e8-46c2-aebd-014cddd94cde)






