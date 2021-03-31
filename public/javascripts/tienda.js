window.addEventListener("load", () => {

    new Glider(document.querySelector(".carousel-elements-destacados"), {
        slidesToShow: 1,
        slidesToScroll: 1,
        duration: 1,
        dots: ".dots-destacados",
        arrows: {
            prev: ".glider-prev-destacados",
            next: ".glider-next-destacados",
        },
        responsive: [
            {
                breakpoint: 425,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  itemWidth: 150,
                  duration: 1,
                  draggable :true
                }
              },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                itemWidth: 150,
                duration: 2,
                draggable :true
              }
            },{
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                itemWidth: 150,
                duration: 3,
                draggable :true
  
              }
            }
          ]
    });
});
