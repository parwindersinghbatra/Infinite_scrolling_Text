let ready = false;
let start = 0
let end = 10
let count = 0
const text_collection = document.getElementById('text_collection')
const getImages = async() =>{
    const API = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`

    if(count == 100)
    {

        const div1 = document.createElement('div')
        div1.style.display = 'block'
        div1.id = 'record_display'
        div1.innerHTML= "No Record Found"
        text_collection.appendChild(div1)
    }
    else{
        try{
            const response = await fetch(API);
            const textArray  = await response.json();
            count += textArray.length;
    
            display_images(textArray)
            start += 10
            end += 10
            ready = true
            
        }catch(e){
            console.log(e)
        }
    }

    }



const display_images = (textArray) =>{

    textArray.forEach((textObj) => {
        const main_div = document.createElement('div')
        main_div.className='overview'
        
        const div1 = document.createElement('div')
         div1.id = 'show_id'
        div1.innerHTML= textObj.id

        const div2 = document.createElement('div')
         div2.id = 'show_data'
        div2.innerHTML= textObj.body
        main_div.appendChild(div1)
        main_div.appendChild(div2)
    text_collection.appendChild(main_div)

    });
}
getImages()

window.addEventListener('scroll', () =>{
    if(window.scrollY + window.innerHeight > document.body.offsetHeight && ready){
        ready = false
        getImages()
    }
})
