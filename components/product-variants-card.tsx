import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { ProductVariant } from '@/lib/shopify/types';

import AddToCartButton from '@/components/add-to-cart-button';
import Price from '@/components/price';

// TODO: divide the component into multiple components
export default function ProductVariantsCard({
  variants,
  productHandle,
  hasPseudoOptions = false
}: {
  variants: ProductVariant[];
  productHandle: String;
  hasPseudoOptions?: boolean;
}) {
  return (
    <ul>
      {variants.map(function (variant: ProductVariant, i, arr) {
        const params = new URLSearchParams();
        variant.selectedOptions.forEach((option) =>
          params.append(option.name.toLowerCase(), option.value)
        );
        const paramsString = params.toString();

        const optAndVarTitleRegex = /(\w+)_(.+)/;
        const optAndVarTitle = optAndVarTitleRegex.exec(variant.title);

        const title =
          !hasPseudoOptions || optAndVarTitle === null
            ? variant.title
            : `${optAndVarTitle[1]!.toUpperCase()}: ${optAndVarTitle[2]}`;

        return (
          <li
            title={variant.availableForSale ? '' : 'Out of stock'}
            key={variant.id}
            className={clsx(
              'rounded-sm border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900',
              {
                'mb-4': i + 1 < arr.length, // don't add a margin to the last element of the list
                'hover:border-blue-600': variant.availableForSale,
                'overfnot classlow-hidden relative z-10 cursor-not-allowed text-neutral-500 before:absolute before:left-1/2 before:right-0 before:top-1/2 before:-z-10 before:h-px before:-translate-x-1/2 before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700 [&_*]:cursor-not-allowed':
                  !variant.availableForSale
              }
            )}
          >
            <Link
              href={`/product/${productHandle}?${paramsString}`}
              className={clsx('flex gap-6 px-3 py-4', {
                'pointer-events-none': !variant.availableForSale
              })}
            >
              <Image
                src={variant.image.url}
                alt={variant.image.altText || variant.title}
                width={80}
                height={80}
                className="h-20 w-20 rounded-sm object-cover"
              />
              <div className="flex flex-col justify-between">
                <p>{title}</p>
                <Price
                  className={clsx('w-fit rounded-full p-2', {
                    'bg-blue-600 text-white': variant.availableForSale,
                    'bg-blue-800 text-neutral-400': !variant.availableForSale
                  })}
                  amount={variant.price.amount}
                  currencyCode={variant.price.currencyCode}
                />
              </div>
              <AddToCartButton productVariant={variant} className="ml-auto" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
