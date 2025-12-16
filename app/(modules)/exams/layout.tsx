import "./styles.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section id="section-exams">{children}</section>;
}
