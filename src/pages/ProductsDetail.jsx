import { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getProductos } from '../services/adminData';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/home.css';
import '../styles/pages/products.css';

const MAX_POR_COMPRA = 5; // igual que el select 1-5 de la versión HTML

function ProductDetail({ alAgregarAlCarrito, totalItemsCount = 0 }) {
  const { id } = useParams();
  const product = getProductos().find((p) => p.id === parseInt(id, 10));

  const [cantidad, setCantidad] = useState(1);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [agregado, setAgregado] = useState(false);

  if (!product) {
    return (
      <PlantillaBase totalItemsCount={totalItemsCount}>
        <div className="main-container">
          <Container className="py-5 text-center">
            <h1>Producto no encontrado</h1>
            <Button as={Link} to="/products" className="btn-iniciar-sesion mt-3">
              Volver a productos
            </Button>
          </Container>
        </div>
      </PlantillaBase>
    );
  }

  const sinStock = product.stock <= 0;
  const maxCantidad = Math.max(1, Math.min(MAX_POR_COMPRA, product.stock));

  // Galería: usa product.images si existe, si no, la imagen única
  const galeria =
    product.images && product.images.length > 0 ? product.images : [product.image];

  const cambiarCantidad = (nueva) => {
    setCantidad(Math.min(maxCantidad, Math.max(1, nueva)));
    setAgregado(false);
  };

  const agregar = () => {
    alAgregarAlCarrito(product, cantidad);
    setAgregado(true);
  };

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="main-container">
        <Container className="py-5">
          <nav aria-label="Ruta de navegación" className="mb-3">
            <Link to="/">Inicio</Link> &gt; <Link to="/products">Productos</Link> &gt;{' '}
            <span>{product.name}</span>
          </nav>

          <Card style={{ border: '3px solid #934bbd', borderRadius: '12px' }}>
            <Card.Body>
              <Row className="align-items-start g-4">
                <Col md={5}>
                  <div className="detalle-galeria__principal">
                    <img src={galeria[imagenActiva]} alt={product.name} />
                  </div>

                  {galeria.length > 1 && (
                    <div className="detalle-galeria__miniaturas">
                      {galeria.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          className={`detalle-miniatura ${i === imagenActiva ? 'activa' : ''}`}
                          onClick={() => setImagenActiva(i)}
                          aria-label={`Ver imagen ${i + 1}`}
                          aria-pressed={i === imagenActiva}
                        >
                          <img src={src} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </Col>

                <Col md={7}>
                  <Text variant="span" className="text-muted">{product.brand}</Text>
                  <Text variant="h2">{product.name}</Text>
                  <Text variant="h3" className="my-3">
                    ${product.price.toLocaleString('es-CL')}
                  </Text>
                  <Text variant="p" className="detalle-descripcion">
                    {product.description}
                  </Text>

                  {alAgregarAlCarrito && (
                    <>
                      <div className="detalle-compra">
                        <label htmlFor="cantidad">Cantidad</label>
                        <div className="detalle-cantidad">
                          <button
                            type="button"
                            onClick={() => cambiarCantidad(cantidad - 1)}
                            disabled={sinStock || cantidad <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <output id="cantidad" aria-live="polite">{cantidad}</output>
                          <button
                            type="button"
                            onClick={() => cambiarCantidad(cantidad + 1)}
                            disabled={sinStock || cantidad >= maxCantidad}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>

                        <Button
                          className="btn-iniciar-sesion"
                          disabled={sinStock}
                          onClick={agregar}
                        >
                          {sinStock ? 'Sin stock' : 'Agregar al carrito'}
                        </Button>
                      </div>

                      {!sinStock && (
                        <p className="detalle-subtotal">
                          Subtotal: ${(product.price * cantidad).toLocaleString('es-CL')}
                        </p>
                      )}
                      {!sinStock && cantidad >= maxCantidad && (
                        <p className="detalle-aviso">
                          Máximo {maxCantidad} por compra.
                        </p>
                      )}
                      {agregado && (
                        <p className="detalle-aviso" role="status">
                          Agregaste {cantidad} al carrito.{' '}
                          <Link to="/carrito">Ver carrito</Link>
                        </p>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </PlantillaBase>
  );
}

export default ProductDetail;
