import { SingleInvoice } from "@/lib/types";
import { formatDate } from "@/lib/util";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const Email = ({
  invoice,
  totals,
}: {
  invoice: SingleInvoice;
  totals: {
    subtotal: string;
    gst: string;
    total: string;
  };
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <Html>
      <Head />

      <Body style={main}>
        <Preview>Apple Receipt</Preview>
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                <Img
                  src={`/static/logo.png`}
                  width="135"
                  height="75"
                  alt="Apple Logo"
                />
              </Column>

              <Column align="right" style={tableCell}>
                <Text style={heading}>Receipt</Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Text style={cupomText}>
              Need some more help?{" "}
              <Link href="https://aztecautoglass.netlify.app">
                Give us a call or send an email
              </Link>
              <sup style={supStyle}>1</sup>
            </Text>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>EMAIL</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: "#15c",
                          textDecoration: "underline",
                        }}
                      >
                        {invoice?.customer.email}
                      </Link>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>INVOICE DATE</Text>
                      <Text style={informationTableValue}>
                        {formatDate(
                          invoice?.createdAt ? invoice?.createdAt : new Date()
                        )}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>GST/HST NO.</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: "#15c",
                          textDecoration: "underline",
                        }}
                      >
                        792765935RT0001
                      </Link>
                    </Column>
                    {/* <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>DOCUMENT NO.</Text>
                      <Text style={informationTableValue}>186623754793</Text>
                    </Column> */}
                  </Row>
                </Section>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableLabel}>BILLED TO</Text>
                <Text style={informationTableValue}>
                  {invoice?.paymentType}
                </Text>
                <Text style={informationTableValue}>
                  {invoice?.customer.firstName} {invoice?.customer.lastName}
                </Text>
                <Text style={informationTableValue}>
                  {invoice?.customer.streetAddress1}
                </Text>
                <Text style={informationTableValue}>
                  {invoice?.customer.city}, {invoice?.customer.postalCode}
                </Text>
                <Text style={informationTableValue}>CANADA</Text>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Services</Text>
          </Section>
          <Section>
            {invoice?.services.map((service) => (
              <Row key={service.id}>
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={productTitle}>
                    {service.vehicleType} {service.serviceType}
                  </Text>
                  <Text style={productDescription}>
                    {service.code} ({service.distributor})
                  </Text>
                  <Text style={productDescription}>{service.notes}</Text>
                  <Link href="" style={productLink} data-saferedirecturl="">
                    Write a Review
                  </Link>
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>{service.quantity}</Text>
                </Column>
                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>{service.price}</Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={productPriceLine} />
          <Section align="right">
            <Row>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>SUBTOTAL</Text>
                <Text style={productPriceTotal}>GST</Text>
                <Text style={productPriceTotalLarge}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine} />
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceMedium}>${totals?.subtotal ?? 0}</Text>
                <Text style={productPriceMedium}>${totals?.gst ?? 0}</Text>
                <Text style={productPriceLarge}>${totals?.total ?? 0}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLineBottom} />
          <Section>
            <Row>
              <Column align="center" style={ctaTitle}>
                <Text style={ctaText}>Need another quote from us?</Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row>
              <Column align="center" style={walletWrapper}>
                <Link
                  href="https://aztecautoglass.netlify.app"
                  style={walletLink}
                >
                  {/* <Img
                    src={`/static/logo.png`}
                    width="60"
                    height="30"
                    alt="Apple Wallet"
                    style={walletImage}
                  /> */}
                  <span style={walletLinkText}>Get a quote fast</span>
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={walletBottomLine} />
          <Text style={footerText}>
            1. You can contact us via email at invoices@aztecautoglass.ca or by
            phone at 587-966-7636.
          </Text>
          <Text style={footerText}>
            Chip repairs are meant to prevent further damage, but we cannot
            guarantee that the chip or crack will disappear completely. Some
            chips may still be visible after repair, and there is a small chance
            the windshield may crack during or after the process. Aztec is not
            responsible for additional damage resulting from the repair.
          </Text>
          <Text style={footerText}>
            Lifetime Warranty for Leaks and Whistling Noises: We offer a
            lifetime warranty on any leaks or whistling noises related to
            windshield installation. If you experience these issues at any time
            after service, we will inspect and correct the problem at no
            additional cost.
          </Text>

          <Text style={footerText}>
            If your windshield cracks within 24 hours of replacement, please
            notify us immediately. We will assess the situation, and if the
            damage is related to installation, we will replace the windshield at
            no cost. Cracks caused by external factors (e.g., rocks, debris) are
            not covered.
          </Text>
          <Text style={footerText}>
            Please call Aztec Auto Glass at 587-966-7636 with questions about
            the invoice or any other inquires.
          </Text>
          <Text style={footerTextCenter}>
            Want to request another{" "}
            <Link href="https://aztecautoglass.netlify.app">quote</Link> for
            your vehicle?
          </Text>

          {/* <Text style={footerTextCenter}>
            {" "}
            You have the option to stop receiving email receipts for your
            subscription renewals. If you have opted out, you can still view
            your receipts in your account under Purchase History. To manage
            receipts or to opt in again, go to{" "}
            <Link href="https://finance-app.itunes.apple.com/account/subscriptions?unsupportedRedirectUrl=https://apps.apple.com/US/invoice">
              Account Settings.
            </Link>
          </Text> */}
          <Section>
            <Row>
              <Column align="center" style={footerIcon}>
                <Img
                  src={`/static/logo.png`}
                  width="90"
                  height="45"
                  alt="Apple Card"
                />
              </Column>
            </Row>
          </Section>
          <Text style={footerLinksWrapper}>
            <Link href="https://aztecautoglass.netlify.app/privacy-policy">
              Terms of Sale
            </Link>{" "}
            •{" "}
            <Link href="https://aztecautoglass.netlify.app/privacy-policy">
              Privacy Policy{" "}
            </Link>
          </Text>
          <Text style={footerCopyright}>
            Copyright © 2025 Aztec Auto Glass. <br />{" "}
            <Link href="">All rights reserved</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

const supStyle = {
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPriceTotalLarge = {
  margin: "0",
  // color: "rgb(102,102,102)",
  fontSize: "12px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceMedium = {
  margin: "0px 20px 0px 0px",
  fontSize: "12px",
  fontWeight: "500",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const block = { display: "block" };

const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

const walletImage = {
  display: "inherit",
  paddingRight: "8px",
  verticalAlign: "middle",
};

const walletBottomLine = { margin: "65px 0 20px 0" };

const footerText = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "0",
  lineHeight: "auto",
  marginBottom: "16px",
};

const footerTextCenter = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "20px 0",
  lineHeight: "auto",
  textAlign: "center" as const,
};

const footerLink = { color: "rgb(0,115,255)" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const walletLinkText = {
  fontSize: "14px",
  fontWeight: "400",
  textDecoration: "none",
};
