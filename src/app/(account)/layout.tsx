/** Account pages (log in, sign up, profile): the site shell without the footer. */
export default function AccountLayout({ children }: LayoutProps<"/">) {
  return <main id="main">{children}</main>;
}
