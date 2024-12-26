import React, { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import Modal from "react-modal";

interface PointTransaction {
  date: string;
  store: string;
  points: number;
  reason: string; 
}


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

const deleteModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    width: "30%",
    maxWidth: "400px",
    height: "auto",
  },
};

Modal.setAppElement("#__next");

interface ActionButtonsProps {
  transaction: PointTransaction; // 수정 없음
  onEdit: (data: { points: string; reason: string }) => void;
  onDelete: () => void;
}

export default function ActionButtons({
  transaction,
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    points: transaction.points.toString(), // 초기값 설정
    reason: transaction.reason, // 초기값 설정
  });

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
    setTimeout(() => setToast(null), 3000);
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

      <Button bg="blue.600" onClick={openEditModal}>
        수정
      </Button>
      <Button bg="red.500" ml={2} onClick={openDeleteModal}>
        삭제
      </Button>

      {/* 수정 모달 */}
      <Modal isOpen={isEditOpen} onRequestClose={closeEditModal} style={editModalStyles}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          포인트 내역 수정
        </Text>
        <Box display="flex" justifyContent="space-between" gap={4} mb={4}>
          <Box flex="1">
            <Text mb={2}>날짜</Text>
            <input
              disabled
              name="date"
              value={transaction.date} // 고정값
              style={{
                padding: "0.5rem",
                width: "100%",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                border: "1px solid #ccc",
                color: "#555",
              }}
            />
          </Box>
          <Box flex="1">
            <Text mb={2}>상호명</Text>
            <input
              disabled
              name="store"
              value={transaction.store} // 고정값
              style={{
                padding: "0.5rem",
                width: "100%",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                border: "1px solid #ccc",
                color: "#555",
              }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={4}>
          <Box flex="1">
            <Text mb={2}>적립/회수</Text>
            <input
              name="points"
              placeholder={transaction.points.toString()}
              value={formData.points}
              onChange={handleChange}
              style={{
                padding: "0.5rem",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
          <Box flex="1">
            <Text mb={2}>사유</Text>
            <input
              name="reason"
              placeholder={transaction.reason}
              value={formData.reason}
              onChange={handleChange}
              style={{
                padding: "0.5rem",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button variant="outline" mr={3} onClick={closeEditModal}>
            취소
          </Button>
          <Button bg="blue.400" onClick={handleSubmit}>
            수정
          </Button>
        </Box>
      </Modal>

      {/* 삭제 모달 */}
      <Modal isOpen={isDeleteOpen} onRequestClose={closeDeleteModal} style={deleteModalStyles}>
        <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">
          포인트 내역을 삭제하시겠어요?
        </Text>
        <Text color="gray.500" mb={6} textAlign="center">
          해당 정보는 복구되지 않습니다.
        </Text>
        <Box display="flex" justifyContent="center">
          <Button variant="outline" mr={3} onClick={closeDeleteModal}>
            취소
          </Button>
          <Button bg="red.400" color="white" onClick={handleDelete}>
            삭제
          </Button>
        </Box>
      </Modal>
    </>
  );
}
