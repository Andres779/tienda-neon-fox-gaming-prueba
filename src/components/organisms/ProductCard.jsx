import { Link } from 'react-router-dom';
import '../../styles/pages/products.css';

function ProductCard({ product, hoverImage, alAgregarAlCarrito }) {
  const sinStock = product.stock <= 0;
  const tieneHover = Boolean(hoverImage);

  return (
    <article className="producto-card">
      <Link
        to={`/products/${product.id}`}
        className="producto-card__imagen"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`principal ${tieneHover ? 'tiene-hover' : ''}`}
          loading="lazy"
        />
        {tieneHover && (
          <img src={hoverImage} alt="" className="hover" loading="lazy" />
        )}
      </Link>

      <div className="producto-card__info">
        <p className="producto-card__marca">{product.brand}</p>
        <h3 className="producto-card__nombre">{product.name}</h3>
        <p className="producto-card__precio">
          ${product.price.toLocaleString('es-CL')}
        </p>

        <div className="producto-card__acciones">
          <Link
            to={`/products/${product.id}`}
            className="btn-producto btn-producto--secundario"
          >
            Ver detalle
          </Link>
          {alAgregarAlCarrito && (
            <button
              type="button"
              className="btn-producto btn-producto--primario"
              disabled={sinStock}
              onClick={() => alAgregarAlCarrito(product, 1)}
            >
              {sinStock ? 'Sin stock' : 'Agregar'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
