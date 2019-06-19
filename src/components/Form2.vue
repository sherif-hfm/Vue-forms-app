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
             milk:{{formData.foodData.milk.value}}<br>
             sugar:{{formData.foodData.sugar.value}}<br>
             lemon:{{formData.foodData.lemon.value}}<br>
            <h2>Radio</h2>
            <input class="w3-radio" type="radio" name="gender" value="male"  checked="checked" formControlName="gender" formControlIndex='0'>
            <label>Male</label>
            <input class="w3-radio" type="radio" name="gender" value="female"   formControlName="gender" formControlIndex='1'>
            <label>Female</label>
            <br>
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
            <select class="w3-select" name="option2" formControlName="options2" multiple  >
                <option value="" disabled selected>Choose your option</option>
                <option value="1" itemCode='A1'>Option 1</option>
                <option value="2" itemCode='A2'>Option 2</option>
                <option value="3" itemCode='A3'>Option 3</option>
            </select>
            option2:{{formData.options2.value}}<br>
             
            <label>Notes</label>
            <button @click.prevent="AddNote()">Add Note</button>
            <br>
            <div v-for="(note, index) in formData.Notes.Controls">
                <input  class="w3-input" type="text" formControlName="Notes.NoteNo" :formControlIndex="index">
                <input  class="w3-input" type="text" formControlName="Notes.NoteDesc" :formControlIndex="index">
                <button @click.prevent="formData.Notes.Controls.splice(index,1)">Remove Note{{index}}</button>
            </div>
            <br>
            Notes:{{formData.Notes.value}}
            <p v-for="(note, index) in formData.Notes.Controls">
                NoteNo:{{note.NoteNo.value}}<br>
                NoteDesc:{{note.NoteDesc.value}}<br>
            </p>
            <br>
            <button @click.prevent="AddData()">AddData</button><br>
                <p v-if="ShowNewData">
                <label>New Data</label>
                <input class="w3-input" type="text" formControlName="newData"><br>
                New Data:{{formData.newData.value}}<br>
                </p>
            
            <hr>
            <button @click.prevent="SetValue()">SetValue</button>
            <button @click.prevent="GetData()">GetData</button>
            <button @click.prevent="ClearValue()">Clear Value</button>
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
                    'fullName':new FormControl('Sherif'),
                    'password':new FormControl()                    
                    }),
                    'foodData':new FormGroup({
                        'milk':new FormControl('true'),
                        'sugar':new FormControl(),
                        'lemon':new FormControl(),
                    }),
                    Notes:new FormArray(),
                    CustomText:new FormControl('A-B'),
                    gender:new FormControl('female'),
                    options:new FormControl(['3']),
                    options2:new FormControl(['1','3'])
                    //options:new FormControl()
                }),
                ShowControl:false,
                ShowNewData:false,
                Notes:[]
       }
   },
   methods:{
       SetValue(){
           console.log('SetValue');
           this.formData.basicData.fullName.setValue('Sherif')
           this.formData.foodData.sugar.setValue('true')
           this.formData.gender.setValue('female')
           this.formData.CustomText.setValue('ABC')
           this.formData.options.setValue(['2'])
           this.formData.options2.setValue(['2','3'])
           //this.formData.get('Notes').setValue('Notes1')
       },
       GetData(){
            console.log(this.formData) ;
            //console.log(this.formData.basicData.fullName.value) ;
       },
       AddNote(){
           //console.log(this.Notes);
            this.formData.Notes.Push(new FormGroup({
                NoteNo:new FormControl(),
                NoteDesc:new FormControl()
            }));
       },
       AddData(){
           //console.log(this);
           //this.$set(this.formData, 'newData', new FormControl())
           this.formData.Push("newData",new FormControl())
           //this.formData.newData=new FormControl();
           this.ShowNewData=true;
       },
       ClearValue()
       {
           this.formData.basicData.fullName.setValue(undefined);
           this.formData.foodData.milk.setValue(undefined)
           this.formData.options.setValue(undefined);
           this.formData.options2.setValue(undefined);
           this.formData.CustomText.setValue(undefined);
       }
   }
}
</script>
<style scoped>

</style>


