<template>
    <div>
        <div class="w3-container w3-blue">
        <h2>Input Form</h2>
        </div>
        <form class="w3-container">
            <p>
            <label>User Name</label>
            <input class="w3-input" type="text" v-model.lazy="formData.userName">{{formData.userName}}</p>
            <p>
            <label>Password</label>
            <input class="w3-input" type="password" v-model="formData.password"></p>
            <p>
            <label>Custom Test</label>
            <CustomText v-model="formData.CustomText" @input1="CustomTextchange($event)"></CustomText></p>
            <h2>Checkboxes</h2>
            <p>
            <input class="w3-check" type="checkbox" name="milk" checked="checked" value="milk" v-model="formData.Food">
            <label>Milk</label></p>
            <p>
            <input class="w3-check" name="sugar" type="checkbox" value="sugar" v-model="formData.Food">
            <label> Sugar</label></p>
            <p>
            <input class="w3-check" name="lemon" type="checkbox" value="lemon" v-model="formData.lemon">
            <label>Lemon (Disabled)</label></p>
            <h2>Radio</h2>
            <input class="w3-radio" type="radio" name="gender" value="male" checked v-model="formData.gender">
            <label>Male</label>
            <input class="w3-radio" type="radio" name="gender" value="female" v-model="formData.gender">
            <label>Female</label>
            <h2>Select</h2>
            <select class="w3-select" name="option" v-model="formData.option" @input="optionchange($event)">
                <option value="" disabled selected>Choose your option</option>
                <option value="1" itemCode='A1'>Option 1</option>
                <option value="2" itemCode='A2'>Option 2</option>
                <option value="3" itemCode='A3'>Option 3</option>
            </select>
            <button @click.prevent="save()">Save</button>
        </form>
        <hr>
        Food:{{formData.Food}}<br>
        lemon:{{formData.lemon}}<br>
        option:{{formData.option}}<br>
        CustomText:{{formData.CustomText}}<br>
    </div>
</template>
<script>
import CustomText from './CustomText.vue'
export default {
   name:'form1' ,
    components: {
    CustomText
  },
   data:function()
   {
       return{
           userName:'',
            formData:{userName:'Sherif',password:'123',CustomText:'-',Food:[],milk:'1',sugar:'',lemon:true,gender:'male',option:'1'}
       }
   },
   methods:{
       save(){
            console.log(this.formData);
       },
        optionchange(e){
            console.log('optionchange');
            console.log(e.target[this.formData.option].attributes.itemcode.nodeValue);
        },
         CustomTextchange(event){
            console.log('CustomTextchange');
            console.log(event);
        }
   }
}
</script>
<style scoped>

</style>


