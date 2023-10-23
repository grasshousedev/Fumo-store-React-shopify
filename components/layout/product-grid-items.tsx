import clsx from 'clsx';
import Link from 'next/link';

import { Product } from 'lib/shopify/types';

import AddToCartButton from '@/components/add-to-cart-button';
import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import ProductVariantsCard from '@/components/product-variants-card';

export default function ProductGridItems({
  products,
  className
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <>
      {products.map(function (product) {
        const hasJustOneVariant = product.variants.length === 1;
        const hasPseudoOptions = product.tags.includes('pseudo_options');

        return (
          <Grid.Item
            key={product.handle}
            className={clsx('group relative animate-fadeIn', className)}
          >
            <Link className="inline-block h-full w-full" href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.variants[0]!.price.amount,
                  currencyCode: product.variants[0]!.price.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Link>
            {hasJustOneVariant ? (
              product.availableForSale && (
                <AddToCartButton
                  isVariantAvailable={true}
                  isPending={false}
                  variantId={product.variants[0]!.id}
                  className="absolute right-6 top-4 hidden group-hover:inline-flex"
                />
              )
            ) : (
              <ProductVariantsCard
                hasPseudoOptions={hasPseudoOptions}
                productHandle={product.handle}
                variants={product.variants}
              />
            )}
          </Grid.Item>
        );
      })}
    </>
  );
}
