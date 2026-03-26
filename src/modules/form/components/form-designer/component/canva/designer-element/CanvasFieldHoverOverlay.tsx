import { useCallback, useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { Button } from '@/common/libs/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { FormFieldConfigType } from '@/modules/form/components/controlledField/common/enum/FormFieldConfigType';
import { useBoundStore } from '@/store';
import FieldSettingsPanel from '../../sidebar/FieldSettingsPanel';
import { Eye, GripVertical, Pencil } from 'lucide-react';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';

type HoverStateProps = {
  isHover: boolean;
};

type CanvasFieldHoverOverlayProps = {
  sectionId: string;
  element: FormFieldConfigType;
  sortable: ReturnType<typeof useSortable>;
  children: (args: HoverStateProps) => JSX.Element;
  canEdit: boolean;
};

const CanvasFieldHoverOverlay = ({
  sectionId,
  element,
  sortable,
  children,
  canEdit,
}: CanvasFieldHoverOverlayProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { removeField, handleSelectedField } = useDesigner();

  const openDrawer = useBoundStore((s) => s.openDrawer);

  const handleOpenViewDrawer = useCallback(() => {
    handleSelectedField({ sectionId, fieldId: element.id });
    openDrawer({
      id: 'designer-view-field',
      title: 'View field',
      titleDescription: 'View the selected field.',

      content: <FieldSettingsPanel canEdit={canEdit} />,
      side: 'left',
      showOverlay: true,
      onClose: () => handleSelectedField(null),
    });
  }, [sectionId, element.id, openDrawer, handleSelectedField, canEdit]);

  const handleOpenEditDrawer = useCallback(() => {
    handleSelectedField({ sectionId, fieldId: element.id });
    openDrawer({
      id: 'designer-edit-field',
      title: 'Edit field',
      titleDescription: 'Modify the selected field.',

      content: <FieldSettingsPanel canEdit={canEdit} />,
      side: 'left',
      showOverlay: true,
      onClose: () => handleSelectedField(null),
    });
  }, [sectionId, element.id, openDrawer, handleSelectedField, canEdit]);

  return (
    <div
      className="relative flex flex-col text-foreground  "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div className="z-10">
          <>
            {canEdit && (
              <>
                {/* Drag handle */}
                <button
                  ref={sortable.setActivatorNodeRef}
                  {...sortable.attributes}
                  {...sortable.listeners}
                  className="
                        absolute left-0 top-1/2 z-20
                        flex  py-4 -translate-x-1/2 -translate-y-1/2
                        items-center justify-center
                        rounded-xl border bg-background/95 text-muted-foreground
                        shadow-qf-sm backdrop-blur-sm
                        transition-colors
                        hover:bg-accent hover:text-accent-foreground
                        active:cursor-grabbing
                        cursor-grab
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0
                "
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  aria-label="Drag"
                  type="button"
                >
                  <GripVertical className="h-5 w-5" />
                </button>
              </>
            )}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="qf-action-group flex flex-col gap-2">
                {canEdit && (
                  <>
                    <Button
                      type="button"
                      size="icon"
                      className="qf-action-btn qf-action-btn-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditDrawer();
                      }}
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      className="qf-action-btn qf-action-btn-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeField(sectionId, element.id);
                      }}
                    >
                      <BiSolidTrash className="h-5 w-5" />
                    </Button>
                  </>
                )}
                {!canEdit && (
                  <>
                    <Button
                      type="button"
                      size="icon"
                      className="qf-action-btn qf-action-btn-info"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenViewDrawer();
                      }}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        </div>
      )}

      {children({ isHover })}
    </div>
  );
};

export default CanvasFieldHoverOverlay;
