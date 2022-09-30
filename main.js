class Flickr {
  constructor(options) {
    this.options = options

    this.container = options.container;
    // this.options = {};
    this.options.api_token = options.api_token;
    this.options.per_page = options.images_limit;
    this.api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.flickrImgsImg;
    this.flickrBoxesBox;
    if (this.container) this.render();
  }
  render() {
    // let defaultOptions = {
    //   container: document.querySelector('.flickr-container'),
    //   api_token: "60db52e60b6936d4298cbd26d5460558",
    //   images_limit: 5
    // }
    
    // this.options = [...defaultOptions, ... this.options]
    var flickrSearcher = document.createElement("div");
    flickrSearcher.classList.add("flickr-searcher");
    this.container.append(flickrSearcher);

    var flickrInput = document.createElement("input");
    flickrInput.classList.add("flickr-input");
    flickrSearcher.append(flickrInput);

    var flickrSubmit = document.createElement("input");
    flickrSubmit.classList.add("flickr-submit");
    flickrSubmit.type = "submit";
    flickrSearcher.append(flickrSubmit);
    var strArr;
    var submitClick = true;
    flickrSubmit.onclick = () => {
      if(submitClick === true) {
        strArr = flickrInput.value.split(/[,.\s]/).filter(function (item) {
          return item.length != 0;
        });
        let flickrImgs = document.createElement("div");
        flickrImgs.classList.add("flickr-imgs");
        this.container.append(flickrImgs);
        
        strArr.map(async (item) => {
          let url = `${this.api_url}&api_key=${this.options.api_token}&tags=${item}&per_page=${this.options.per_page}&page=3&format=json&nojsoncallback=1`;
          let result = await fetch(url);
          try{
              result = await result.json();
          }catch(ex){
              console.log(ex)
          }
          let photos = result.photos.photo;

          for(let i = 0;i < photos.length;i++) {
            photos[i].name = item;
          }
          
          function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        photos.map((pic) => {
            let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
            
            this.flickrImg = document.createElement("img");
            this.flickrImg.classList.add("flickr-imgs__img");
            this.flickrImg.alt = pic.name;
            flickrImgs.append(this.flickrImg);
            this.flickrImg.src = srcPath; 
            console.log(this.flickrImg);   
        });

      let dragged = null;
      this.flickrBox = this.container.querySelectorAll(".flickr-boxes__box")
      this.flickrImg = this.container.querySelectorAll(".flickr-imgs__img")
      this.flickrImg.forEach((item) => {item.addEventListener("dragstart", (event) => {
        dragged = event.target;})
      });

      
      this.flickrBox.forEach(function(item) {
        item.addEventListener("dragover", (event) => {
          event.preventDefault();
      })
      });
      this.flickrBox.forEach((item) => {
        item.addEventListener("drop", (event) => {
        event.preventDefault();
        if (event.target.textContent === dragged.alt) {
          event.target.appendChild(dragged);
          dragged.style.visibility = 'hidden';
          b.push(dragged)

        }
        });
      });
      });

      let flickrBoxes = document.createElement("div");
      flickrBoxes.classList.add("flickr-boxes");
      this.container.append(flickrBoxes);

      for (let i = 0; i < strArr.length; i++) {
        this.flickrBox = document.createElement("div");
        this.flickrBox.classList.add("flickr-boxes__box");
        this.container.querySelector(".flickr-boxes").append(this.flickrBox);
      }
      this.flickrBox.onclick = () => {
        let showBoxContent = document.createElement("div");
        showBoxContent.classList.add("flickr-boxes-content");
        this.container.append(showBoxContent);
        let a = this.container.querySelector('.flickr-boxes__box')
        let b = []
        for (let i in a) {
          if (a.hasOwnProperty(i)) {
              console.log(i)
          }

      }
        
        
      
      }
      
      for (let i = 0; i < strArr.length; i++) {
        this.container.querySelectorAll(".flickr-boxes__box")[i].textContent = strArr[i];
      }
      submitClick = false;
    }
  }
  }
}
