<template>
    <div>
        <input type="text" :value="value" @input="change($event)"><br>    
    </div>
</template>

<script>
export default {
     name:'CustomText' ,
    //  props:['value'],
     data:function(){
         return {
             value:'',
         }
     },
     methods:{
         Done(event)
         {
            console.log(this);
            //this.$emit('change1',this);
            this.$emit('input',event.target.value);
            //this.$emit('input1',event);
         },
         change(event)
         {
             //console.log('change ' + event.target.value);
             //this.$set(this, 'nValue', event.target.value)
             this.value=event.target.value;
            this.$emit('input',this);
         }
     }
}
</script>

