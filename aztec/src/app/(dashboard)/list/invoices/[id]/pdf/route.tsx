import prisma from "@/lib/prisma";
import { calculateInvoiceTotals, formatPhoneNumber } from "@/lib/util";
import { Customer, Invoice, Service } from "@prisma/client";
import { notFound } from "next/navigation";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  renderToStream,
  Font,
} from "@react-pdf/renderer";
import { NextResponse } from "next/server";

type SingleInvoice =
  | (Invoice & { customer: Customer } & { services: Service[] })
  | null;

interface InvoiceProps {
  invoice: SingleInvoice;
  totals: {
    subtotal: string;
    gst: string;
    total: string;
  };
}

const replacementEligibleServices = [
  "Windshield",
  "Door Glass",
  "Back Glass",
  "Sunroof",
  "Mirror",
  "Quarter Glass",
];

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Montserrat-Regular.ttf`,
      fontWeight: "normal",
    },
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Montserrat-Italic.ttf`,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Montserrat-Bold.ttf`,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Montserrat" },
  divider: { height: 1, backgroundColor: "grey", marginVertical: 10 },
  headerDivider: { height: 5, backgroundColor: "grey", marginVertical: 10 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: { width: 120, height: 60, padding: 4 },
  companyInfo: { flex: 1, marginLeft: 10 },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  contactInfo: { fontSize: 10, color: "grey" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  // Define table styles with equal flex values for each column
  tableHeader: {
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 5,
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  itemColumn: { flex: 2, flexDirection: "column" },
  item: { textTransform: "uppercase" },
  quantityColumn: { flex: 1, textAlign: "center" },
  priceColumn: { flex: 1, textAlign: "center" },
  amountColumn: { flex: 1, textAlign: "center" },
  total: { marginTop: 10, fontSize: 14, fontWeight: "bold" },
  label: { fontWeight: "bold" },
  subSection: {
    color: "grey",
    fontStyle: "italic",
    textTransform: "uppercase",
    fontSize: 10,
    marginTop: 2,
  },
  disclaimerPage: {
    padding: 30,
    fontSize: 12,
    color: "grey",
    textAlign: "center",
  },
  disclaimerSubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  disclaimerText: {
    fontSize: 10,
    color: "grey",
    marginTop: 5,
  },
});

const InvoiceDocument = ({ invoice, totals }: InvoiceProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* Logo on the left */}
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`}
            style={styles.logo}
          />

          {/* Company info on the right */}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{"Aztec Auto Glass Ltd"}</Text>

            <Text style={styles.contactInfo}>
              {formatPhoneNumber("5879667636")} | {"invoices@aztecautoglass.ca"}
            </Text>

            <Text style={styles.contactInfo}>GST/HST: {"792765935RT0001"}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.headerDivider} />
        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.title}>
            Invoice #{String(invoice?.id).padStart(6, "0")}
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Customer and Invoice Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Customer:</Text>
              <Text>
                {invoice?.customer.firstName} {invoice?.customer.lastName}
              </Text>
              <Text>{invoice?.customer.email}</Text>
              <Text>
                {formatPhoneNumber(invoice?.customer.phone as string)}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Invoice Details:</Text>
              <Text>
                PDF created {invoice?.createdAt?.toLocaleDateString()}
              </Text>
              <Text>${totals.total}</Text>
            </View>
            <View>
              <Text style={styles.label}>Payment:</Text>
              <Text>{"Due on Receipt"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>

        {/* Services Table */}
        <View style={styles.section}>
          <View style={[styles.row, styles.tableHeader]}>
            <Text style={styles.itemColumn}>Item</Text>
            <Text style={styles.quantityColumn}>Quantity</Text>
            <Text style={styles.priceColumn}>Price</Text>
            <Text style={styles.amountColumn}>Amount</Text>
          </View>
          {invoice?.services && invoice.services.length > 0 ? (
            invoice.services.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.itemColumn}>
                  <Text style={styles.item}>
                    {item.vehicleType} {item.serviceType}{" "}
                    {replacementEligibleServices.includes(item.serviceType)
                      ? "replacement"
                      : ""}
                  </Text>
                  <Text style={styles.subSection}>
                    {item.code} ({item.distributor})
                  </Text>
                  <Text style={styles.subSection}>{item.notes}</Text>
                </View>
                <Text style={styles.quantityColumn}>{item.quantity}</Text>
                <Text style={styles.priceColumn}>${item.price}</Text>
                <Text style={styles.amountColumn}>
                  ${item.price * item.quantity}
                </Text>
              </View>
            ))
          ) : (
            <Text>No services available</Text>
          )}
          <View style={styles.divider} />
        </View>

        {/* Subtotal, GST, and Total */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text>Subtotal:</Text>
            <Text>${totals.subtotal}</Text>
          </View>
          <View style={styles.row}>
            <Text>GST (5%):</Text>
            <Text>${totals.gst}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.total}>${totals.total}</Text>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.disclaimerPage}>
        <View>
          <Text style={styles.title}>DISCLAIMER</Text>
          {/* Chip Repair Section */}
          <Text style={styles.disclaimerSubtitle}>Chip Repair:</Text>
          <Text style={styles.disclaimerText}>
            Chip repairs are meant to prevent further damage, but we cannot
            guarantee that the chip or crack will disappear completely. Some
            chips may still be visible after repair, and there is a small chance
            the windshield may crack during or after the process. Aztec is not
            responsible for additional damage resulting from the repair.
          </Text>

          {/* Warranty Section */}
          <Text style={styles.disclaimerSubtitle}>WARRANTY</Text>
          <Text style={styles.disclaimerText}>
            Lifetime Warranty for Leaks and Whistling Noises: We offer a
            lifetime warranty on any leaks or whistling noises related to
            windshield installation. If you experience these issues at any time
            after service, we will inspect and correct the problem at no
            additional cost.
          </Text>

          {/* Cracks within 24 Hours Section */}
          <Text style={styles.disclaimerSubtitle}>Cracks within 24 Hours:</Text>
          <Text style={styles.disclaimerText}>
            If your windshield cracks within 24 hours of replacement, please
            notify us immediately. We will assess the situation, and if the
            damage is related to installation, we will replace the windshield at
            no cost. Cracks caused by external factors (e.g., rocks, debris) are
            not covered.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const invoiceId = parseInt(params.id);

  const result: SingleInvoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      customer: true,
      services: true,
    },
  });

  if (!result) {
    return notFound();
  }

  const { subtotal, gst, total } = calculateInvoiceTotals(result.services);

  const invoice = {
    invoice: {
      ...result,
    },

    totals: {
      subtotal,
      gst,
      total,
    },
  };

  const stream = await renderToStream(<InvoiceDocument {...invoice} />);

  return new NextResponse(stream as unknown as ReadableStream);
}
