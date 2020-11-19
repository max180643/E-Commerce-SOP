import Link from 'next/link';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Link href="/">
          <Navbar.Brand style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faHome} style={{ height: '1.5em' }} /></Navbar.Brand>
        </Link>
      </Navbar>
      <Container className="pt-1">
        <Component {...pageProps} />
      </Container>
    </div>
  );
}

export default MyApp;
