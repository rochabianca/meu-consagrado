<template>
  <form v-on:submit.prevent>
    <label for="value">Valor pago</label>
    <input v-model="paymentData.paid" type="number" />
    <button @click="createPayment">Pagar</button>
    <div v-if="error">
      {{ error }}
    </div>
  </form>
</template>

<script>
export default {
  name: "PayBill",
  data() {
    return {
      paymentData: {
        id: this.$route.params.id,
        created_at: null,
        paid: null
      },
      error: null
    };
  },
  methods: {
    createPayment() {
      if (!this.paymentData.paid) {
        this.error = "Você precisa inserir a quantidade paga!";
      } else {
        this.paymentData.created_at = Date.now();
        this.paymentData.paid = Number(this.paymentData.paid).toFixed(2);
        this.$store.dispatch("createPayment", this.paymentData).then(res => {
          this.$emit("new-payment", res);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
