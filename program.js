$(document).ready(function () {
    $('.displayBox').css('display', 'none');
    $('.filterOptions').change(function () {

        var theChosenGender = $('#genderOption').find(':selected').attr('data-gender-option');

        var theChosenAge = $('#ageOption').find(':selected').attr('data-age-option');

        var theChosenWeight = $('#weightOption').find(':selected').attr('data-weight-option');

        var theChosenDay = $('#dayOption').find(':selected').attr('data-day-option');

        var theChosenArea = $('#areaOption').find(':selected').attr('data-area-option');

        $('.displayBox').css('display', 'none');
        var selector = '.displayBox';
        
        if (theChosenGender != "all") {
            selector += '[data-gender-option="' + theChosenGender + '"]';
        }
        else{
            selector -= '[data-gender-option="' + theChosenGender + '"]';
        }
        if (theChosenAge != "all") {
            selector += '[data-age-option="' + theChosenAge + '"]';
        }else{
            selector -= '[data-age-option="' + theChosenAge + '"]';
        }
        if (theChosenWeight != "all") {
            selector += '[data-weight-option="' + theChosenWeight + '"]';
        }else{
            selector -= '[data-weight-option="' + theChosenWeight + '"]';
        }
        if (theChosenDay != "all") {
            selector += '[data-day-option="' + theChosenDay + '"]';
        }else{
            selector -= '[data-day-option="' + theChosenDay + '"]';
        }
        if (theChosenArea != "all") {
            selector += '[data-area-option="' + theChosenArea + '"]';
        }else{
            selector -= '[data-area-option="' + theChosenArea + '"]';
        }
        
        $(selector).fadeIn();

    });


    let besinBilgileri = {}; // Başlangıçta boş bir nesne oluştur

// Besin verilerini JSON dosyasından yükle
fetch('besinBilgileri.json')
    .then(response => response.json())
    .then(data => {
        besinBilgileri = data; // Yüklenen veriyi besinBilgileri nesnesine ata
    })
    .catch(error => console.error('Veri yüklenirken hata oluştu:', error));

// Enter tuşuna basıldığında fonksiyonu çalıştıracak olay dinleyicisi.
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        showNutritionInfo();
    }
});

// Besin bilgilerini gösteren fonksiyon.
function showNutritionInfo() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // Girilen metni al ve küçük harfe çevir.
    const besinListesi = searchTerm.split(','); // Virgülle ayrılmış besin isimlerini listeye dönüştür.

    let sonucMetni = ""; // Sonuç metnini başlat.

    // Her bir besin ismini kontrol et ve sonucu oluştur.
    besinListesi.forEach(besin => {
        besin = besin.trim(); // Boşlukları kaldır.
        if (besinBilgileri[besin]) {
            sonucMetni += besinBilgileri[besin] + "<br>"; // Sonuç metnine besin bilgisini ekle ve alt satıra geç.
        } else {
            sonucMetni += `${besin} bulunamadı.<br>`; // Besin bulunamazsa hata mesajı ekle.
        }
    });

    document.getElementById('result').innerHTML = sonucMetni; // Sonuç metnini göster.
}


});

