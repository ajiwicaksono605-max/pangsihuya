// Ganti nomor berikut dengan nomor WhatsApp bisnis Pangsihuya, format internasional tanpa tanda +.
const WHATSAPP_NUMBER = "6281234567890";

const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const totalEl = document.getElementById("total");

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(value).replace(/\u00a0/g, " ");
}
function updateTotal() {
  const option = productSelect.options[productSelect.selectedIndex];
  const price = Number(option.dataset.price || 0);
  let quantity = Math.max(1, Math.min(99, Number(quantityInput.value) || 1));
  quantityInput.value = quantity;
  totalEl.textContent = formatRupiah(price * quantity);
}
productSelect.addEventListener("change", updateTotal);
quantityInput.addEventListener("input", updateTotal);
document.getElementById("minus").addEventListener("click", () => {
  quantityInput.value = Math.max(1, (Number(quantityInput.value) || 1) - 1); updateTotal();
});
document.getElementById("plus").addEventListener("click", () => {
  quantityInput.value = Math.min(99, (Number(quantityInput.value) || 1) + 1); updateTotal();
});
document.querySelectorAll(".order-btn").forEach(button => {
  button.addEventListener("click", () => {
    productSelect.value = button.dataset.product;
    updateTotal();
    document.getElementById("pesan").scrollIntoView({behavior:"smooth"});
  });
});
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const option = productSelect.options[productSelect.selectedIndex];
  const product = option.value;
  const price = Number(option.dataset.price || 0);
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const note = document.getElementById("note").value.trim();
  const total = price * quantity;
  const message = [
    "Halo Pangsihuya! Saya ingin memesan:",
    "",
    `Nama: ${name}`,
    `Menu: ${product}`,
    `Jumlah: ${quantity} porsi`,
    `Estimasi total: ${formatRupiah(total)}`,
    note ? `Catatan: ${note}` : "",
    "",
    "Mohon konfirmasi ketersediaannya. Terima kasih!"
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
}));
document.getElementById("year").textContent = new Date().getFullYear();
updateTotal();
