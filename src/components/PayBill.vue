<template>
  <modal title="Adicionar Pagamento" @close="$emit('close')">
    <form v-on:submit.prevent>
      <label for="value">Valor pago</label>
      <input v-model="paymentData.paid" type="number" />
      <div v-if="error">
        {{ error }}
      </div>
    </form>
    <template slot="footer">
      <button @click="$emit('close')" class="button button__link">
        Cancelar
      </button>
      <button class="button button__primary" @click="createPayment">
        Pagar
      </button>
    </template>
  </modal>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "PayBill",
  components: {
    Modal
  },
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
          this.resetPaymentData();
        });
      }
    },
    resetPaymentData() {
      this.paymentData = {
        id: this.$route.params.id,
        created_at: null,
        paid: null
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  background: none;
  border: none;
  padding: 8px 16px;
  min-width: 100px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 18px;
  &.button__primary {
    background: $red;
    color: $white;
  }
  &.button__link {
    color: $dark-blue;
  }
}
</style>
