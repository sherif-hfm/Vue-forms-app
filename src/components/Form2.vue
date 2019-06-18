<template>
    <div>
        <div class="w3-container w3-blue">
        <h2>Input Form2</h2>
        </div>
        <form class="w3-container" v-FormGroup="formData">
            <div>
                <p>
                <label>User Name</label>
                <input class="w3-input" type="text" formControlName="basicData.fullName"> </p>
                Full Name:{{formData.basicData.fullName.value}}<br>
                <p>
                <label>Password</label>
                <input class="w3-input" type="password" formControlName="basicData.password"></p>
            </div>
            <button @click.prevent="ShowControl=!ShowControl">Show Controls</button><br>            
            <p v-if="ShowControl">
            <label>Custom Test</label>
            <CustomText  formControlName="CustomText"></CustomText></p>
            CustomText:{{formData.CustomText.value}}<br>
           
            <h2>Checkboxes</h2>
             <div>
                <p>
                <input class="w3-check" type="checkbox" name="milk" checked="checked"  formControlName="foodData.milk">
                <label>Milk</label></p>
                <p>
                <input class="w3-check" name="sugar" type="checkbox"  formControlName="foodData.sugar">
                <label> Sugar</label></p>
                <p>
                <input class="w3-check" name="lemon" type="checkbox"  formControlName="foodData.lemon">
                <label>Lemon (Disabled)</label></p>
             </div>
             Milk:{{formData.foodData.milk.value}}<br>
             lemon:{{formData.foodData.lemon.value}}<br>
            <h2>Radio</h2>
            <input class="w3-radio" type="radio" name="gender" value="male"  checked="checked" formControlName="gender" formControlIndex='0'>
            <label>Male</label>
            <input class="w3-radio" type="radio" name="gender" value="female"   formControlName="gender" formControlIndex='1'>
            <label>Female</label>
             gender:{{formData.gender.value}}<br>
            <h2>Select</h2>
            <select class="w3-select" name="option" formControlName="options" >
                <option value="" disabled selected>Choose your option</option>
                <option value="1" itemCode='A1'>Option 1</option>
                <option value="2" itemCode='A2'>Option 2</option>
                <option value="3" itemCode='A3'>Option 3</option>
            </select>
             option:{{formData.options.value}}<br>
            <h2>Select2</h2>
            <select class="w3-select" name="option" formControlName="options2" multiple  >
                <option value="" disabled selected>Choose your option</option>
                <option value="1" itemCode='A1'>Option 1</option>
                <option value="2" itemCode='A2'>Option 2</option>
                <option value="3" itemCode='A3'>Option 3</option>
            </select>
            option2:{{formData.options2.value}}<br>
             
            <label>Notes</label>
            <div v-for="(note, index) in formData.Notes.value">
                <input  class="w3-input" type="text" formControlName="Notes" :formControlIndex="index">
                <button @click.prevent="formData.Notes.value.splice(index,1)">Remove Note{{index}}</button>
            </div>
            <br>
            <button @click.prevent="AddNote()">Add Note</button>
            <br>
            Notes:{{formData.Notes.value}}<br>
            <hr>
            <button @click.prevent="SetValue()">SetValue</button>
            <button @click.prevent="GetData()">GetData</button>
        </form>
    </div>
</template>
<script>
import CustomText from './CustomText.vue'
import {FormGroup,FormControl,FormArray} from './vue-form.js'
export default {
   name:'form2' ,
    components: {
    CustomText
  },
   data:function()
   {
       return{
            formData:new FormGroup({
                'basicData':new FormGroup({
                    'fullName':new FormControl(),
                    'password':new FormControl()                    
                    }),
                    'foodData':new FormGroup({
                        'milk':new FormControl(),
                        'sugar':new FormControl(),
                        'lemon':new FormControl(),
                    }),
                    Notes:new FormArray(),
                    CustomText:new FormControl(),
                    gender:new FormControl(),
                    options:new FormControl(),
                    options2:new FormControl()
                    //options:new FormControl()
                }),
                ShowControl:true,
                Notes:[]
       }
   },
   methods:{
       SetValue(){
           console.log('SetValue');
           //this.formData.get('basicData.fullName').setValue('Sherif')
           //this.formData.get('foodData.sugar').setValue('true')
           //this.formData.get('gender').setValue('female')
           //this.formData.get('CustomText').setValue('ABC')
           this.formData.get('options').setValue(['2'])
           //this.formData.get('options2').setValue(['2','3'])
           //this.formData.get('Notes').setValue('Notes1')
       },
       GetData(){
            console.log(this.formData) ;
            //console.log(this.formData.basicData.fullName.value) ;
       },
       AddNote(){
            this.Notes.push('');
       }
   }
}
</script>
<style scoped>

</style>


