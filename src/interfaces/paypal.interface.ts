export interface PayPalOrderStatusResponse {
    id: string;
    status: string;
    intent: string;
    gross_total_amount: GrossTotalAmount;
    purchase_units: PurchaseUnit[];
    payment_details: PaymentDetails;
    payer: Payer;
    links: Link[];
    update_time: string;
}

export interface GrossTotalAmount {
    value: string;
    currency: string;
}

export interface Link {
    href: string;
    rel: string;
    method: string;
}

export interface Payer {
    name: Name;
    email_address: string;
    payer_id: string;
    phone: Phone;
    address: Address;
}

export interface Address {
    country_code: string;
}

export interface Name {
    given_name: string;
    surname: string;
}

export interface Phone {
    phone_number: PhoneNumber;
}

export interface PhoneNumber {
    national_number: string;
}

export interface PaymentDetails {}

export interface PurchaseUnit {
    reference_id: string;
    amount: PurchaseUnitAmount;
    payee: Payee;
    shipping_address: ShippingAddress;
    payments: Payments;
    invoice_number: string;
    status: string;
}

export interface PurchaseUnitAmount {
    currency: string;
    details: Details;
    total: string;
}

export interface Details {
    subtotal: string;
    shipping: string;
    handling_fee: string;
    shipping_discount: string;
    insurance: string;
}

export interface Payee {
    email: string;
    merchant_id: string;
}

export interface Payments {
    captures: Capture[];
}

export interface Capture {
    id: string;
    amount: GrossAmountClass;
    final_capture: boolean;
    seller_protection: SellerProtection;
    seller_receivable_breakdown: SellerReceivableBreakdown;
    invoice_id: string;
    status: string;
    supplementary_data: SupplementaryData;
    create_time: string;
    update_time: string;
    links: Link[];
}

export interface GrossAmountClass {
    currency_code: string;
    value: string;
}

export interface SellerProtection {
    status: string;
    dispute_categories: string[];
}

export interface SellerReceivableBreakdown {
    gross_amount: GrossAmountClass;
    paypal_fee: GrossAmountClass;
    net_amount: GrossAmountClass;
}

export interface SupplementaryData {
    related_ids: RelatedIDS;
}

export interface RelatedIDS {
    order_id: string;
}

export interface ShippingAddress {
    recipient_name: string;
    line1: string;
    city: string;
    country_code: string;
    postal_code: string;
    state: string;
}
