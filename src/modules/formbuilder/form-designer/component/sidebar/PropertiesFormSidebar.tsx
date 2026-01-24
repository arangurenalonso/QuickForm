import { Button } from '@/common/libs/ui/button';
import { Separator } from '@/common/libs/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { AiOutlineClose } from 'react-icons/ai';
import { useMemo } from 'react';

const PropertiesFormSidebar = () => {
  const { selectedField, handleSelectedField, sections } = useDesigner();

  const field = useMemo(() => {
    if (!selectedField) return null;

    const section = sections.find((s) => s.id === selectedField.sectionId);
    if (!section) return null;

    return section.fields.find((f) => f.id === selectedField.fieldId) ?? null;
  }, [selectedField, sections]);

  if (selectedField && !field) {
    handleSelectedField(null);
    return null;
  }

  if (!field) return null;

  const { render } = field;
  const { EditablePropsForm, RulesForm } = render;

  return (
    <div className="h-full w-full">
      <Tabs
        defaultValue="editable"
        className="w-full h-full grid grid-rows-[auto,1fr] gap-0"
      >
        <div className="row-start-1 row-end-2">
          <div className="flex items-center">
            <TabsList className="flex-grow flex justify-center">
              <TabsTrigger value="editable">Properties</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
            </TabsList>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleSelectedField(null)}
            >
              <AiOutlineClose />
            </Button>
          </div>

          <Separator className="my-2" />
        </div>

        <TabsContent value="editable" className="overflow-hidden">
          <div className="h-full w-full overflow-auto">
            <EditablePropsForm formFieldConfig={field} />
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="h-full w-full overflow-auto">
            <RulesForm formFieldConfig={field} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesFormSidebar;
