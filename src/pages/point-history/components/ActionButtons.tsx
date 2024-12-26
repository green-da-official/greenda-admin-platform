import React, { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import Modal from "react-modal";

const editModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    width: "60%",
    maxWidth: "800px",
    height: "auto",
  },
};

Modal.setAppElement("#__next");

interface ActionButtonsProps {
  onEdit: (data: { points: string; reason: string }) => void;
  onDelete: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({ points: "", reason: "" });
  const [toast, setToast] = useState<{ message: string; status: "success" | "error" } | null>(null);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);
  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onEdit(formData);
    closeEditModal();
    setToast({ message: "포인트 내역이 성공적으로 수정되었습니다.", status: "success" });
    setTimeout(() => setToast(null), 3000); // 3초 후 Toast 숨기기
  };

  const handleDelete = () => {
    onDelete();
    closeDeleteModal();
    setToast({ message: "포인트 내역이 성공적으로 삭제되었습니다.", status: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      {toast && (
        <Box
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          bg={toast.status === "success" ? "green.500" : "red.500"}
          color="white"
          px={4}
          py={2}
          borderRadius="md"
          zIndex={1000}
        >
          {toast.message}
        </Box>
      )}

      <Button colorScheme="blue" onClick={openEditModal}>
        수정
      </Button>
      <Button colorScheme="red" ml={2} onClick={openDeleteModal}>
        삭제
      </Button>

      {/* 수정 모달 */}
      <Modal isOpen={isEditOpen} onRequestClose={closeEditModal} style={editModalStyles}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          포인트 내역 수정
        </Text>
        <Box mb={4}>
          <Text mb={2}>적립/회수</Text>
          <input
            name="points"
            placeholder="1550"
            value={formData.points}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </Box>
        <Box mb={4}>
          <Text mb={2}>사유</Text>
          <input
            name="reason"
            placeholder="31kg 수거"
            value={formData.reason}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button   variant="outline" mr={3} onClick={closeEditModal}>
            취소
          </Button>
          <Button bg="blue.400"  onClick={handleSubmit}>
            수정
          </Button>
        </Box>
      </Modal>

      {/* 삭제 모달 */}
      <Modal isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} style={editModalStyles}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          포인트 내역 삭제
        </Text>
        <Text color="gray.500" mb={6}>
          삭제 후에는 복구할 수 없습니다. 계속하시겠습니까?
        </Text>
        <Box display="flex" justifyContent="center">
          <Button variant="outline" mr={3} onClick={closeDeleteModal}>
            취소
          </Button>
          <Button  bg="red.400"  onClick={handleDelete}>
            삭제
          </Button>
        </Box>
      </Modal>
    </>
  );
}
