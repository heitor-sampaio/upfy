import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageUrl, setSelectedImageUrL] = useState('');

  function openImage(imgUrl: string): void {
    setSelectedImageUrL(imgUrl);
    onOpen();
  }

  return (
    <>
      <SimpleGrid spacing="10" columns={3}>
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => {
              openImage(card.url);
            }}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
