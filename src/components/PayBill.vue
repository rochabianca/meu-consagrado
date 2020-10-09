<template>
  <div></div>
</template>

<script>
export default {
  name: "PayBill",
  data() {
    return {
      payload: {
        id: 2,
        created_at: Date.now(),
        paid: 10
      }
    };
  },
  created() {
    this.createPayment();
  },
  methods: {
    createPayment() {
      this.$store.dispatch("createPayment", this.payload).then(res => {
        this.$emit("new-payment", res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
