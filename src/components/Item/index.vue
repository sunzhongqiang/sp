<template>
  <div>
    <div class="item-row">
      <el-image
        style="width: 100px; height: 100px"
        :src="item.img"
        fit="fit"
      />
      <div class="item-description">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-attribute">商品规格：{{ item.attribute }} </div>
        <div class="item-sku">商品编码：{{ item.skuCode }}</div>
      </div>

      <div class="item-price-num">
        <div>{{ item.price }} 元 X {{ item.num }} = 40 元</div>
        <div>运费：0.0元</div>
      </div>
    </div>
    <div>
      收货地址：{{ address }}
    </div>
  </div>
</template>
<script>

export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      default() {
        return { title: '商品标题要来因先于如们保子', attribute: '规格属性', skuCode: 'abcd', price: '20', num: '2', img: '' }
      }
    },
    address: {
      type: String,
      default: '山东省 威海市 港湾区 将物调增要来因先于如们保子西马,素府导当提管音位根界事维六参'
    }
  }
}
</script>
<style scoped>
.item-row{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left:8px;
}
.item-description{
  width: 500px;
}
.item-price-num{
  border: 1px solid #eee;
}
.item-attribute{
  margin: 8px 0 ;
}
</style>
