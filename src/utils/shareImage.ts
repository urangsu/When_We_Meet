import { toBlob } from 'html-to-image';

export const createPngFileFromElement = async (
  element: HTMLElement,
  filename: string
) => {
  const blob = await toBlob(element, {
    pixelRatio: 2,
    backgroundColor: '#FFFFFF',
  });

  if (!blob) {
    throw new Error('이미지 생성에 실패했어요.');
  }

  return new File([blob], filename, { type: 'image/png' });
};

export const shareImageFile = async (file: File) => {
  if (
    typeof navigator !== 'undefined' &&
    'canShare' in navigator &&
    navigator.canShare?.({ files: [file] })
  ) {
    await navigator.share({
      files: [file],
      title: '우리 달력',
      text: '우리 달력에서 만든 약속 메모예요.',
    });
    return 'shared' as const;
  }

  const url = URL.createObjectURL(file);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.name;
  anchor.click();
  URL.revokeObjectURL(url);

  return 'downloaded' as const;
};
