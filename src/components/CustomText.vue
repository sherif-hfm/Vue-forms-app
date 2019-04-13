<template>
    <div>
        <input type="text" :value='value' @input="change($event)" >
    </div>
</template>

<script>
export default {
     name:'CustomText' ,
     props:['value'],
     methods:{
         change(event)
         {
            this.$emit('input',event.target.value);
            this.$emit('input1',event);
         }
     }
}
</script>

