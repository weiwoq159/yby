<template>
  <div>
    <el-cascader
      :options="options"
      @active-item-change="handleItemChange"
      :props="props"
      :debounce='1000'
    ></el-cascader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      props: {
        value: 'id',
        children: 'sub',
        label: 'name'
      }
    }
  },

  methods: {
    handleItemChange (val) {
      console.log('active item:', val)
    },
    changeAddress (res) {
      console.log(res)
      this.options = res.data
      this.place = '请选择省市'
    }
  },
  mounted () {
    this.axios.get('./static/address.json', {category: '1'})
      .then(this.changeAddress)
  }
}
</script>
