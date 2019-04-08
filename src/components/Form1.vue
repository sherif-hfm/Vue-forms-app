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
            <select class="w3-select" name="option" v-model="formData.option">
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
        </form>
        Food:{{formData.Food}}<br>
        {{formData.lemon}}
    </div>
</template>
<script>
export default {
   name:'form1' ,
   data:function()
   {
       return{
           userName:'',
            formData:{userName:'Sherif',password:'123',Food:[],milk:'1',sugar:'',lemon:true,gender:'male',option:'1'}
       }
   }
}
</script>
<style scoped>

</style>


