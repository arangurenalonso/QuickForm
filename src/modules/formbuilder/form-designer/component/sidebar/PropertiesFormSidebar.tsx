import { Button } from '@/common/libs/ui/button';
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
    <Tabs defaultValue="editable" className="w-full h-full">
      <div className="grid h-full w-full grid-rows-[auto_1fr]  ">
        <div>
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
        </div>

        <div className="min-h-0 w-full overflow-y-auto   ">
          <TabsContent value="editable">
            <EditablePropsForm formFieldConfig={field} />
          </TabsContent>
          <TabsContent value="rules">
            <RulesForm formFieldConfig={field} />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default PropertiesFormSidebar;
