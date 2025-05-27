import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = '' }) => {
  const [value, setValue] = useState(defaultValue);

  return ( 
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

function useTabsContext() {
  const context = useContext(TabsContext); 
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
  const { value: selectedValue, onChange } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={() => onChange(value)}
      className={`
        px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 
        ${isSelected 
          ? 'bg-gold text-navy' 
          : 'bg-navy/50 text-neutral-300 hover:bg-navy/70'
        }
        focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1 focus:ring-offset-neutral-900
        ${className}
      `}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? 'active' : 'inactive'}
      className={className}
    >
      {children}
    </div>
  );
};