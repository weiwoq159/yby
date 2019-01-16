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

  },
  mounted () {
    for (let i = 0; i <= 40; i++) {
      this.axios.post('/book/web/api/comment/commentAdd',
        {
          bookId: '6487153192182116372',
          bookTitle: '2019年的养老金政策发生了哪些变化',
          bookType: 0,
          content: '1'
        }).then((res) => {
        console.log(123)
      })
    }
    console.log('任务结束')
  }
}
</script>
