import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderTopRadius="0" borderBottomRadius="md" bg="pGray.800">
        <ModalBody p="0">
          <Image
            src={imgUrl}
            w="100%"
            maxW="900"
            h="100%"
            maxH="600"
            objectFit="cover"
          />
        </ModalBody>

        <ModalFooter h="8">
          <Link color="pGray.50" mr="auto" href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
