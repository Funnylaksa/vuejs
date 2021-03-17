Vue.component('product', {
    props: {
        premium:{
            type: Boolean,
            required: true
            }
        },
    template:`
    <div class="product">
    
        <div class="product-image">
            <a v-bind:href="url"> <img v-bind:src="image"> </a>
        </div>

        <div class="product-info">
            <h1> {{ title }} </h1>
            <p> {{ description }} </p>
            <p v-if="inStock >= 10" > In Stock </p>
            <p v-else-if="inStock < 10 && inStock >0" > Running Out </p> 
            <p v-else> Out of Stock</p>
            
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            
            <div class="color-box"
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
            </div> 
            
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>
            
            <button @click="cart -= 1"> Remove from Cart </button> 
            <button @click="inventory -= 1"> Remove from Inventory </button> 
        </div>
        <product-review></product-review>
        
    </div>
    `,
    data(){
        return{
            brand: "Ivan's",
            product: 'Shoes',
            description: 'this is a pair of warm cuddly socks',
            //image: './assets/footwear.png',
            selectedVariant: 0,
            url: 'http://youtube.com',
            inventory: 20,
            onSale: true,
            //inStock: true,
            details: ["Cotton", "Polyester", "Outdoor"],
            variants:[
            {
                variantId: 1,
                variantColor: 'black',
                variantImage: './assets/footwear.png',
                variantQuantity: 10
            },
            {
                variantId: 2,
                variantColor: 'blue',
                variantImage: './assets/footwear_blue.png',
                variantQuantity: 0
            },
            {
                variantId: 3,
                variantColor: 'green',
                variantImage: './assets/footwear.png',
                variantQuantity: 5
            }],
            sizes: ['s', 'm', 'l'],
            }
    },
    methods:{
        addToCart:function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            console.log(this.variants[this.selectedVariant].variantId)
        },
        //updateImage: function(variantImage){
        //    this.image = variantImage
        //},
        updateProduct: function(index){
            this.selectedVariant = index
            console.log(index)
        },
        
    },
    
    computed:{
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
      
    }
})

Vue.component('product-review', {
    template:`
    <input v-model="name">
    `,
    data(){ 
    return{
        name: null
    }
    }
})

var app  = new Vue ({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods:{
        updateCart: function(id){
            this.cart.push(id)
        }
    }
})


