alert("Welcome");
let tbody=document.querySelector("tbody");
let list_products=document.querySelector(".table_container");
let productId=0;

async function addToCart(e){
    alert("Add to chart");
   let id= e.target.id;
   productId= id;
  
   let product=new Product();
    let storItem=[];
    await product.getProducts().then(
    (product)=>{console.log(productId);
                if(!sessionStorage.getItem("addToCart")){
                    storItem=[];
                    let tmp=product.find(p => p.id === productId);
                    console.log(productId);
                    tmp.amount+=1;
                storItem.push(tmp);
                }else{
                    let ttmp=JSON.parse(sessionStorage.getItem("addToCart"));
                    let verify=false;
                    ttmp.map(tmp=>{
                        if(tmp.id===productId){
                            console.log(tmp.id);
                            tmp.amount+=1;
                            verify=true;
                        }
                    })
                    if(verify==true){
                        storItem=ttmp;
                       
                    }else{
                       console.log(ttmp);
                       let tttmp=product.find(p => p.id === productId);
                       tttmp.amount+=1;
                        ttmp.push(tttmp);
                        storItem=ttmp;
                        
                    }
                }

                
         
            sessionStorage.setItem("addToCart",JSON.stringify(storItem));
            console.log(sessionStorage.getItem("addToCart"));
    }        //storItem.push(product=>product.find(productId===product.id));
    )
}

class Product{
    async getProducts(){
        let result=await fetch("products.json");
        let kk=await result.json();
        let items=kk.items;
      //  console.log(kk.items);
      items=items.map(item=>{
            const id=item.sys.id;
            const img=item.fields.image.fields.file.url;
            const title=item.fields.title;
            const price=item.fields.price;
            const amount=0;
            return {id,title,price,img,amount}
        });
        return items;
        
    }
}



class Ui{
     showProducts(products){
        let result="";
        products.forEach(eachProduct=>{
            result+=`<div id=${eachProduct.id} class="item">
            <div>${eachProduct.id}</div>
            <div><img src=${eachProduct.img} alt=""></div>
            <div>${eachProduct.title}</div>
            <div>${eachProduct.price}</div>
          
            <div><button id="${eachProduct.id}" class="add">add</button></div>
        </div>`
        });
        list_products.innerHTML=result;

    }

    buttonClick(){
        let additems=document.querySelectorAll('.add');
        additems.forEach(additem=>{additem.addEventListener('click',addToCart);});
     
    }
}
let product=new Product();
let ui=new Ui();
document.addEventListener('DOMContentLoaded',()=>{

//let sessionitem=new SessionItem();
console.log("hi");

product.getProducts().then(
(product)=>{
    console.log(product);
    ui.showProducts(product);
    

   // console.log(JSON.parse(sessionStorage.getItem("addToCart")));

}
)
.then(()=>{
    ui.buttonClick();
    
  
    
})


})

//ui.showProducts(allProducts);