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
                <p>
                <label>Password</label>
                <input class="w3-input" type="password" formControlName="basicData.password"></p>
            </div>            
            <p>
            <label>Custom Test</label>
            <CustomText  formControlName="CustomText"></CustomText></p>
            <p v-if="NotesView">
            <label>Notes</label>
            <input class="w3-input" type="text" formControlName="Notes">
            </p>
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
            <h2>Radio</h2>
            <input class="w3-radio" type="radio" name="gender" value="male" checked="checked" formControlName="gender">
            <label>Male</label>
            <input class="w3-radio" type="radio" name="gender" value="female"   formControlName="gender">
            <label>Female</label>
            <h2>Select</h2>
            <select class="w3-select" name="option" formControlName="options" >
                <option value="" disabled selected>Choose your option</option>
                <option value="1" itemCode='A1'>Option 1</option>
                <option value="2" itemCode='A2'>Option 2</option>
                <option value="3" itemCode='A3'>Option 3</option>
            </select>
            <h2>Select2</h2>
            <select class="w3-select" name="option" formControlName="options2" multiple  >
                <option value="" disabled selected>Choose your option</option>
                <option value="1" itemCode='A1'>Option 1</option>
                <option value="2" itemCode='A2'>Option 2</option>
                <option value="3" itemCode='A3'>Option 3</option>
            </select>
            <hr>
            <button @click.prevent="SetValue()">SetValue</button>
            <button @click.prevent="GetData()">GetData</button>
            <button @click.prevent="NotesView=!NotesView">Show Controls</button>
        </form>
        <hr>
        Full Name:{{formData.basicData.fullName.value}}<br>
        CustomText:{{formData.CustomText.value}}<br>
        Notes:{{formData.Notes.value}}<br>
        Milk:{{formData.foodData.milk.value}}<br>
        lemon:{{formData.foodData.lemon.value}}<br>
        gender:{{formData.gender.value}}<br>
        option:{{formData.options.value}}<br>
        option2:{{formData.options2.value}}<br>
        
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
                    Notes:new FormControl(),
                    CustomText:new FormControl(),
                    gender:new FormControl(),
                     options:new FormArray(),
                     options2:new FormArray()
                    //options:new FormControl()
                }),
                NotesView:false
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
       }
   }
}
</script>
<style scoped>

</style>


